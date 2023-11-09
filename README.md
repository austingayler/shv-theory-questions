# shv-theory-questions

SHV / FSVL theory exam questions in a less bad interface

Setup:

https://jsonformatter.org/xml-to-json

```
<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope
	xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:xsd="http://www.w3.org/2001/XMLSchema">
	<soap:Body>
		<GetQuestionsResponse
			xmlns="http://eLearning.shv-fsvl.ch/">
			<GetQuestionsResult>
				<Error>false</Error>
				<Result>
					<__Question>
						<ID>1346</ID>
						<Number>23</Number>
						<ImageID xsi:nil="true" />
						<Answer>3</Answer>
						<Question>Wovon hängt der Luftwiderstand eines Körpers massgeblich ab?</Question>
						<Answer1>Von der absoluten Luftfeuchte.</Answer1>
						<Answer2>Vom Druckgradienten.</Answer2>
						<Answer3>Von der Luftdichte.</Answer3>
						<Answer4>Von der Temperatur-Taupunkt-Differenz.</Answer4>
						<CorrectAnswered>0</CorrectAnswered>
						<WrongAnswered>0</WrongAnswered>
					</__Question>
```

```
{
  "Envelope": {
    "Body": {
      "GetQuestionsResponse": {
        "GetQuestionsResult": {
          "Error": false,
          "Result": {
            "__Question": [
              {
                "ID": 1346,
                "Number": 23,
                "ImageID": "",
                "Answer": 3,
                "Question": "Wovon hängt der Luftwiderstand eines Körpers massgeblich ab?",
                "Answer1": "Von der absoluten Luftfeuchte.",
                "Answer2": "Vom Druckgradienten.",
                "Answer3": "Von der Luftdichte.",
                "Answer4": "Von der Temperatur-Taupunkt-Differenz.",
                "CorrectAnswered": 0,
                "WrongAnswered": 0
              },
```