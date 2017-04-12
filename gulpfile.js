var gulp = require('gulp');
var apigeetool = require('apigeetool')
var gutil = require('gulp-util')
var request = require('request');
var fs = require('fs');
var seedsdk = require('seed-sdk');
var unzip = require('unzip');

var PROXY_NAME = "WSDL to Proxy"
var SAMPLE_NAME = "WSDL to Proxy"

gulp.task('default', function() {
  // place code for your default task here
});

var opts = {
    organization: gutil.env.org,
    token: gutil.env.token,
    environments: gutil.env.env,    
    environment: gutil.env.env,
    wsdlUrl: gutil.env.wsdlUrl,
    binding: gutil.env.binding,
    debug: gutil.env.debug    
}

gulp.task('deploy', function(){
    opts.api = PROXY_NAME
    opts.proxies = PROXY_NAME
    opts.environments = 'test'
	console.log("WSDL Url: " + opts.wsdlUrl);
	console.log("Binding: " + opts.binding);

	var url = 'https://soap-to-rest.appspot.com/wsdl2proxy?wsdlUrl=' + opts.wsdlUrl + '&binding=' + opts.binding;

	request(url)
  		.pipe(fs.createWriteStream('apiproxy.zip'))
  		.on('close', function () {
   		 	console.log('API Proxy downloaded!');
			fs.createReadStream('apiproxy.zip').pipe(unzip.Extract({ path: '.' }));
		
	    	var sdk = apigeetool.getPromiseSDK()
			return sdk.deployProxy(opts).then(function(){
				console.log('success');
			});
  		});
})

gulp.task('clean',function(){
	opts.api = PROXY_NAME
    opts.proxies = PROXY_NAME
    opts.environments = 'test'
    
    var sdk = apigeetool.getPromiseSDK()
    return sdk.undeploy(opts)
              .then(function(){ return sdk.delete(opts)})
                console.log(app)

})
