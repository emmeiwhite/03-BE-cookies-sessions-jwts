export const logger = (req, res, next) => {
  console.log(`[ ${new Date().toLocaleString()} from the route ${req.url} ]`)
}
