
module.exports.MemoryAscoltatore = function() {
  return {};
}

module.exports.RedisAscoltatore = function() {
  return {
    redis: require('redis')
  };
};

var portCounter = 10042;
module.exports.nextPort = function() {
  return portCounter++;
};

module.exports.ZeromqAscoltatore = function(remote_ports) {
  return {
    zmq: require("zmq"),
    port: "tcp://127.0.0.1:" + module.exports.nextPort(),
    delay: 0
  };
};

module.exports.RabbitAscoltatore = function() {
  return {
    amqp: require("amqp"),
    exchange: "ascolatore" + module.exports.nextPort()
  };
};

module.exports.MQTTAscoltatore= function() {
  return {
    mqtt: require("mqttjs"),
    host: "127.0.0.1",
    port: 1883
  };
};
