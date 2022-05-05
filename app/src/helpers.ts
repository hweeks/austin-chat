export const get_server_url = (urlSubset: string) => {
  let urlToCall = "http://localhost:3005"
  if (window.location.origin.endsWith(".gitpod.io")) {
    urlToCall = window.location.origin.replace("https://3000-", "https://3005-")
  }
  return new URL(urlSubset, urlToCall).toString()
}