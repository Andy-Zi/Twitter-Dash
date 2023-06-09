const TREND_SERVICE_HOSTNAME = "localhost";
const TREND_SERVICE_PORT = 50010;

const PROTO_PATH = __dirname + "/../../protos/TrendService.proto";
const PROTO_DIR = __dirname + "/../../protos";
let grpc = require('@grpc/grpc-js');
let protoLoader = require('@grpc/proto-loader');
const gs = require("@google-cloud/scheduler");

const LAGGY = true;
const DELAY = 200;

let packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
    includeDirs: [PROTO_DIR]
  });

let protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
let twitterdash = protoDescriptor.twitterdash;

async function GetRecentTweetCountsInternal(GetRecentTweetCountsRequest) {
  if (LAGGY) {await new Promise(r => setTimeout(r, DELAY));}
  let now_seconds = Math.floor(Date.now() / 1000)
  let one_week_ago = new Date(Date.now() - (1000 * 60 * 60 * 24 * 7))
  let one_week_ago_seconds = Math.floor(one_week_ago.getTime() / 1000)
  let query = GetRecentTweetCountsRequest.query;
  let end_date = new gs.protos.google.protobuf.Timestamp.fromObject({seconds: now_seconds});
  if (GetRecentTweetCountsRequest.hasOwnProperty("end_date")) {
    end_date = new gs.protos.google.protobuf.Timestamp.fromObject(GetRecentTweetCountsRequest.end_date);
  }

  let start_date = new gs.protos.google.protobuf.Timestamp.fromObject({seconds: end_date.seconds - 7 * 24 * 60 * 60});
  if (GetRecentTweetCountsRequest.hasOwnProperty("start_date")) {
    start_date = new gs.protos.google.protobuf.Timestamp.fromObject(GetRecentTweetCountsRequest.start_date);
  }

  let granularity = GetRecentTweetCountsRequest.hasOwnProperty("granularity") ? GetRecentTweetCountsRequest.granularity : "hour";

  let granularity_seconds = null;
  switch (granularity) {
    case "day":
      granularity_seconds = 60 * 60 * 24;
      break;
    case "hour":
      granularity_seconds = 60 * 60;
      break;
    case "minute":
      granularity_seconds = 60;
      break;
  }

  let tweetCounts = [];

  for (let i = start_date.seconds.low; i <= end_date.seconds.low ; i += granularity_seconds) {
    if (i < now_seconds && i > one_week_ago_seconds) {
      let timestamp = new gs.protos.google.protobuf.Timestamp.fromObject({seconds: i});
      let tweetCount = {
        datetime: timestamp,
        count: Math.floor(Math.random() * 100000)
      }
      tweetCounts.push(tweetCount)
    }
  }

  let GetRecentTweetCountsReply = {
    tweetCounts: tweetCounts
  }

  return GetRecentTweetCountsReply;
}

async function GetRecentTweetCounts(call, callback) {
  callback(null, await GetRecentTweetCountsInternal(call.request));
}

function getServer() {
  var server = new grpc.Server();
  server.addService(twitterdash.TweetCountsProvider.service, {
    GetRecentTweetCounts: GetRecentTweetCounts
  });
  return server;
}

if (require.main === module) {
  // If this is run as a script, start a server on an unused port
  var DatabaseReaderServer = getServer();
  DatabaseReaderServer.bindAsync(`${TREND_SERVICE_HOSTNAME}:${TREND_SERVICE_PORT}`, grpc.ServerCredentials.createInsecure(), () => {
    console.log("Starting TrendServiceServer ... ");
    DatabaseReaderServer.start();
  });
}

exports.getServer = getServer;
