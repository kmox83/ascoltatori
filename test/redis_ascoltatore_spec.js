
describe(ascoltatori.RedisAscoltatore, function() {

  behaveLikeAnAscoltatore();

  beforeEach(function(done) {
    this.instance = new ascoltatori.RedisAscoltatore(redisSettings());
    this.instance.on("ready", done);
  });

  afterEach(function() {
    this.instance.close();
  });

  it("should sync two instances", function(done) {
    var other = new ascoltatori.RedisAscoltatore(redisSettings());
    var that = this;
    async.series([
      function(cb){
        other.on("ready", cb);
      },
      function(cb) {
        that.instance.subscribe("hello", wrap(done), cb);
      },
      function(cb) {
        other.publish("hello", null, cb);
      }
    ]);
  });
});
