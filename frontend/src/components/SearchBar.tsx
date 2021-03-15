import { GenericField } from './shared/GenericFormField'
import React, { FormEventHandler } from 'react'

export interface SearchBarProps {
  onSubmit: FormEventHandler<HTMLFormElement>
  queryString: string
  handleChangeQueryString: (s: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit, queryString, handleChangeQueryString }) => {

  return <form
    autoComplete='off' noValidate onSubmit={onSubmit}>
    <GenericField
      isOutlined={true}
      inputType={'text'}
      placeholderValue={queryString}
      isRequired={false}
      setField={handleChangeQueryString}
      validationFunc={(s: string) => s.length > 2}
      messages={{
        id: 'searchTagBar',
        label: 'Cari',
        autoComplete: 'true',
        name: 'searchTags',
        invalidInput: 'search invalid'
      }}
    />
  </form>
}

export default SearchBar