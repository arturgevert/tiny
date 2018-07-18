function saveCountry(country){
	var connect = $.hdb.getConnection();
	var output = JSON.stringify(country);
	var fnCreateCountry = connect.loadProcedure("tinyworld.db_tiny::createCountry");
	var result = fnCreateCountry({IM_COUNTRY: country.name, IM_CONTINENT: country.partof});
	
	connect.commit();
	connect.close();
	if(result && result.EX_ERROR != null){ //!=
		return {body : result, status : $.net.http.BAD_REQUEST};
	}else{
		return {body : output, status : $.net.http.CREATED};
	}
}

var body = $.request.body.asString();
var country = JSON.parse(body);

//hier ist Inputsvalidation

var output = saveCountry(country);

$.response.contentType = "application/json";

$.response.setBody(output.body);
$.response.status = output.status;