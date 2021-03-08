package models

import (
	"errors"
)

type HasuraEvent struct {
	ID      string `json:"id"`
	Event   `json:"event"`
	Table   `json:"table"`
	Trigger `json:"trigger"`
}

type Event struct {
	Op   string `json:"op"`
	Data `json:"data"`
}

type Data struct {
	Old map[string]interface{} `json:"old"`
	New map[string]interface{} `json:"new"`
}

type Table struct {
	Name   string `json:"name"`
	Schema string `json:"schema"`
}

type Trigger struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

type AccountTable struct {
	UserID string `json:"user_id"`
	Role   string `json:"role"`
	Email  string `json:"email"`
}

func (e *Event) ToAccountTables() ([]*AccountTable, error) {
	switch e.Op {
	case "UPDATE":
		var tbls []*AccountTable
		oldRecord, err := ToAccountTables(e.Data.Old)
		if err != nil {
			return nil, err
		}
		newRecord, err := ToAccountTables(e.Data.New)
		if err != nil {
			return nil, err
		}
		if newRecord.Role != oldRecord.Role {
			tbls = append(tbls, oldRecord)
			tbls = append(tbls, newRecord)
		}
		return tbls, nil
	case "DELETE":
		var tbls []*AccountTable
		tbl, err := ToAccountTables(e.Data.Old)
		if err != nil {
			return nil, err
		}
		tbls = append(tbls, tbl)
		return tbls, nil
	default:
		return nil, errors.New("operation unknown")
	}
}

func ToAccountTables(input map[string]interface{}) (*AccountTable, error) {
	var act AccountTable
	if input["user_id"] != nil {
		act.UserID = input["user_id"].(string)
	} else {
		return nil, errors.New("UserID is empty")
	}
	if input["role"] != nil {
		act.Role = input["role"].(string)
	} else {
		return nil, errors.New("role is empty")
	}
	if input["email"] != nil {
		act.Email = input["email"].(string)
	} else {
		return nil, errors.New("email is empty")
	}

	return &act, nil
}
