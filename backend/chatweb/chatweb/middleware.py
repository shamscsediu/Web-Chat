from builtins import Exception, object
from threading import current_thread

_REQUESTS = {}


class RequestNotFound(Exception):
    def __init__(self, message):
        self.message = message


def get_request():
    thread = current_thread()
    if thread not in _REQUESTS:
        raise RequestNotFound('global request error')
    else:
        return _REQUESTS[thread]


class RequestMiddleware(object):
    def __init__(self, get_response):
        self.get_response = get_response

    def process_request(self, request):
        _REQUESTS[current_thread()] = request

    def __call__(self, request):
        self.process_request(request)
        response = self.get_response(request)

        return response
