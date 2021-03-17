import React, { PropsWithChildren, ReactElement } from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { CircularProgress } from '@material-ui/core'

interface HasIdAndName {
  id: string
  name: string
}

export interface AutoCompleteFieldProps<T extends HasIdAndName> {
  values: T[] | undefined
  setSelected: Function
  label: string
}

export function AutoCompleteField<T extends HasIdAndName>(props: PropsWithChildren<AutoCompleteFieldProps<T>>): ReactElement {
  const [open, setOpen] = React.useState(false)
  const defaultValues: T[] = []
  const loading = props.values === undefined || props.values.length === 0

  return (
    <Autocomplete
      id={props.label}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      getOptionSelected={(option, value) => {
        return option.id === value.id
      }}
      onChange={((event, value) => value !== null ? props.setSelected(value.id) : '')}
      getOptionLabel={(option) => option.name}
      options={props.values !== undefined ? props.values : defaultValues}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label={props.label}
          variant={'outlined'}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color='inherit' size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            )
          }}
        />
      )}
    />
  )
}