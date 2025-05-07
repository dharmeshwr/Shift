declare global {
  interface Window {
    api: {
      ping: () => void
      getUserConfiguration: () => object
      updateUserConfiguration: (content: object) => boolean
    }
  }
}
