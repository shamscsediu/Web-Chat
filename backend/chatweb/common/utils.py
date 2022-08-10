from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import exception_handler
import logging

logger = logging.getLogger('django')


def custom_exception_handler(exc, context):
    # Call REST framework's default exception handler first, to get the standard error response.
    response = exception_handler(exc, context)

    # No response means DRF couldn't handle it, output a generic 500 in a JSON format
    if not response:
        response = Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        if str(exc):
            exception_str = '{}: {}'.format(exc.__class__.__name__, exc)
        else:
            exception_str = exc.__class__.__name__

        response.data = {'details': exception_str}
        logger.exception(exception_str)

    return response
