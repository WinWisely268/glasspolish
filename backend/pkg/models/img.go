package models

import (
	"bytes"
	"errors"
	"fmt"
	"github.com/google/uuid"
	"github.com/machinebox/graphql"
	log "github.com/sirupsen/logrus"
	"github.com/winwisely268/glasspolish-triggers/pkg/mutation"
	"strconv"
	"strings"
	"text/template"
)

type UploadURLRequest struct {
	Bucket      string `json:"bucket,omitempty"`
	File        string `json:"file,omitempty"`
	ContentType string `json:"contentType,omitempty"`
	Width       int64  `json:"width,omitempty"`
	Height      int64  `json:"height,omitempty"`
	Prefix      string `json:"prefix,omitempty"`
}

type Prefix struct {
	AccountID      uuid.UUID
	TableName      string
	TableRecordID  uuid.UUID
	TableFieldName string
	Timestamp      int64
	Filename       string
}

func ToPrefix(key string) (*Prefix, error) {
	var p Prefix
	splitted := strings.Split(key, "/")
	if len(splitted) < 7 {
		return nil, errors.New(
			fmt.Sprintf("object has invalid key length, expected 7, got: %d", len(splitted)),
		)
	}
	accId, err := uuid.Parse(splitted[1])
	if err != nil {
		return nil, errors.New("invalid account id")
	}
	p.AccountID = accId
	p.TableName = splitted[2]
	tableRecordID, err := uuid.Parse(splitted[3])
	if err != nil {
		return nil, errors.New("invalid table record ID")
	}
	p.TableRecordID = tableRecordID
	if splitted[4] == "" {
		return nil, errors.New("invalid table field name")
	}
	p.TableFieldName = splitted[4]
	tstamp, err := strconv.ParseInt(splitted[5], 10, 64)
	if err != nil {
		return nil, err
	}
	p.Timestamp = tstamp
	p.Filename = splitted[6]
	return &p, nil
}

func (p *Prefix) ToString() string {
	return strings.Join([]string{
		p.AccountID.String(),
		p.TableName,
		p.TableRecordID.String(),
		p.TableFieldName,
		strconv.FormatInt(p.Timestamp, 10),
		p.Filename}, "/",
	)
}

func (p *Prefix) GenerateMutationQuery() (*graphql.Request, error) {
	var bf bytes.Buffer
	fmap := template.FuncMap{
		"toSnakeCase": mutation.ToCaseSnake,
		"toCamelCase": mutation.ToCamelCase,
	}
	t := template.Must(template.New("parsedPrefix").Funcs(fmap).Parse(mutation.QueryTemplate))
	if err := t.Execute(&bf, p); err != nil {
		return nil, err
	}
	log.WithFields(log.Fields{
		"query": bf.String(),
	}).Info("Mutation query")
	req := graphql.NewRequest(bf.String())
	req.Var("accountId", p.AccountID)
	req.Var("id", p.TableRecordID)
	req.Var(mutation.ToCamelCase(p.TableFieldName), p.ToString())
	return req, nil
}

type UploadURLResponse struct {
	URL     string            `json:"url,omitempty"`
	Headers map[string]string `json:"headers,omitempty"`
}

type DownloadURLRequest struct {
	Scheme string `json:"scheme,omitempty"`
	Domain string `json:"domain,omitempty"`
	File   string `json:"file,omitempty"`
	Prefix string `json:"prefix,omitempty"`
}

type DownloadURLResponse struct {
	URL string `json:"url,omitempty"`
}
