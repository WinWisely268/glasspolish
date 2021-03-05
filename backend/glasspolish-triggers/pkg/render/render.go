package resp

import (
	"encoding/json"
	"github.com/aws/aws-lambda-go/events"
	log "github.com/sirupsen/logrus"
	"net/http"
)

func ParseReqBody(req events.APIGatewayProxyRequest, data interface{}) error {
	if req.Body != "" {
		err := json.Unmarshal([]byte(req.Body), &data)
		if err != nil {
			return err
		}
	}
	return nil
}

func corsHeaders() map[string]string {
	headers := map[string]string{
		"Access-Control-Allow-Origin":  "*",
		"Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
		"Access-Control-Allow-Headers": "Content-Type,Authorization,X-Amz-Date,X-Api-Key",
	}
	return headers
}

func Render(body interface{}, status int) (events.APIGatewayProxyResponse, error) {
	headers := corsHeaders()
	bods, err := json.Marshal(body)
	if err != nil {
		log.WithFields(log.Fields{"error": err}).Error("Parsing JSON body failed")
		return events.APIGatewayProxyResponse{
			StatusCode: http.StatusInternalServerError,
			Headers:    headers,
			Body:       err.Error(),
		}, err
	}
	if status < 200 || status >= 400 {
		log.WithFields(log.Fields{
			"status": status,
			"body":   string(bods),
		}).Error("request failed")
	}
	return events.APIGatewayProxyResponse{
		Headers:    headers,
		StatusCode: status,
		Body:       string(bods),
	}, nil
}

func RenderOK(body interface{}) (events.APIGatewayProxyResponse, error) {
	return Render(body, http.StatusOK)
}

func RenderBadRequest(body interface{}) (events.APIGatewayProxyResponse, error) {
	return Render(body, http.StatusBadRequest)
}

func RenderInternalErr(body interface{}) (events.APIGatewayProxyResponse, error) {
	return Render(body, http.StatusInternalServerError)
}
