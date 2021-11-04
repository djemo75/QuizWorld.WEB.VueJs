export const parseLinkHeader = (linkHeader) => {
  const linkHeadersArray = linkHeader
    .split(", ")
    .map((header) => header.split("; "))
  const linkHeadersMap = linkHeadersArray.map((header) => {
    const thisHeaderRel = header[1].replace(/"/g, "").replace("rel=", "")
    const thisHeaderUrl = header[0].slice(1, -1)
    return [thisHeaderRel, thisHeaderUrl]
  })
  return Object.fromEntries(linkHeadersMap)
}

export const calculateTotalRows = (url) => {
  const urlObject = new URL(url)
  const params = new URLSearchParams(urlObject.search)
  return Number(params.get("_page")) * Number(params.get("_limit"))
}
