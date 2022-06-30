# Generated by the gRPC Python protocol compiler plugin. DO NOT EDIT!
"""Client and server classes corresponding to protobuf-defined services."""
import grpc

from . import TweetService_pb2 as TweetService__pb2


class TweetProviderStub(object):
    """Missing associated documentation comment in .proto file."""

    def __init__(self, channel):
        """Constructor.

        Args:
            channel: A grpc.Channel.
        """
        self.GetTweets = channel.unary_unary(
                '/twitterdash.TweetProvider/GetTweets',
                request_serializer=TweetService__pb2.GetTweetsRequest.SerializeToString,
                response_deserializer=TweetService__pb2.GetTweetsReply.FromString,
                )


class TweetProviderServicer(object):
    """Missing associated documentation comment in .proto file."""

    def GetTweets(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')


def add_TweetProviderServicer_to_server(servicer, server):
    rpc_method_handlers = {
            'GetTweets': grpc.unary_unary_rpc_method_handler(
                    servicer.GetTweets,
                    request_deserializer=TweetService__pb2.GetTweetsRequest.FromString,
                    response_serializer=TweetService__pb2.GetTweetsReply.SerializeToString,
            ),
    }
    generic_handler = grpc.method_handlers_generic_handler(
            'twitterdash.TweetProvider', rpc_method_handlers)
    server.add_generic_rpc_handlers((generic_handler,))


 # This class is part of an EXPERIMENTAL API.
class TweetProvider(object):
    """Missing associated documentation comment in .proto file."""

    @staticmethod
    def GetTweets(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/twitterdash.TweetProvider/GetTweets',
            TweetService__pb2.GetTweetsRequest.SerializeToString,
            TweetService__pb2.GetTweetsReply.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)