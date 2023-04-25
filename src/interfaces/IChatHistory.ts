export interface IChat {
  clientRole: string | undefined
  message: string | undefined
  assistantRole: string | undefined
  response: string | undefined
}

export interface IChatHistory {
  chatTitle: string,
  chat: IChat[]
}