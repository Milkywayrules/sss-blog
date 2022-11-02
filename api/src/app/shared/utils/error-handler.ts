export const handleErrors = (error: any): Error => {
  let err

  if (error instanceof Error) err = error
  else err = new Error(error)

  return err
}
