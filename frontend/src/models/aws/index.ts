export type uploadURLForm = {
  file: File
}

export type downloadURLForm = {
  prefix: string
  file: string
}

export type mediaAPIResponse = {
  url: string
  headers?: Record<string, string>
}

export type presignedURLForm = {
  file: string
  contentType: string
  width?: number
  height?: number
  prefix: string
}

export type imagePrefix = {
  accountId: string
  tableName: string
  tableRecordId: string
  tableFieldName: string
}

export const imagePrefixStringify = ({ accountId, tableName, tableRecordId, tableFieldName }: imagePrefix) => {
  const currentTimestamp = Math.floor(Date.now() / 1000)
  const prefixes: string[] = [accountId, tableName, tableRecordId, tableFieldName, currentTimestamp.toString()]
  return prefixes.join('/')
}

export const DEFAULT_IMG_WIDTH = 1000
export const DEFAULT_IMG_HEIGHT = 1000