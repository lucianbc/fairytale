# Text Generation service

This is a Flask service that serves the models used for text generation.

The problems that this service tries to solve are:
* resource consumption: the AI task takes more resources and it is better to host this service on an environment with GPU access.
* availability: this service should not put in danger the availability of the main app.
* threading access to the model: the service should run in a multi threading environment, to serve concurrent resources. 
But the model is stateful and a request should not affect the other. At the moment, the problem is solved by 
building the model for each request (see ```Model::generate_text``` method). A better implementation is warmly welcomed.

## API
This service has a very simple API. It has only two calls:
* GET ```localhost:5000/models```.
    
    Response:
    ```
    [
        {
            "id": "charles_kingsley",
            "name": "Charles Kingsley"
        }
    ]
    ```
    Queries the available models. It receives an id used for generating text and a name that can be displayed in front end.
* POST ```localhost:5000/predict```
    ```
    {
	    "text": "Shall I take",
	    "model": "charles_kingsley",
	    "sentences": 4
    }
    ```
    Response:
    ```
    {
    "result": " wratch hearts with a land, would how herself in any strong internuber and nature, and you will be done. The breath with me that bread off in the world. To that child has made Elsley took it;--though man was gone cleanly glaring to bestow her intelligence to which, she went, eed. But now, ther? Over your man, Marie, now,\" that is myself, while He knows away into a paitful vain, \"I am noved the wind, with forest was to be given them every night as I am not signifious author, Sunday and died erranst out."
    }
    ```
    In the request body one must specify the starting string, the id of the model being used (from the previous GET) and the number of 
    sentences being generated. Take note that the maximum number of characters is hardcoded to ```1000``` 
    (see ```helpers.py```). 
    
Take note that no error checking is done. So if the POST's request body is not how it was intended to be, the service will fail with a ```500 Internal Server Error```.