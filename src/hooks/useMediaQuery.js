import * as React from "react"
// refs: https://github.com/matthewhudson/current-device
// constants
const PC_BREAKPOINT_WIDTH = 1024 // pc ( resolution > 1024 )
// mobile ( resolution < 640 )

export default () => {
  const [initResize, setInitResize] = React.useState(false)
  const [mediaType, setMediaType] = React.useState("mobile")

  React.useEffect(() => {
    const handleResize = () => {
      const w = Math.max(
        document.documentElement.clientWidth,
        window.innerWidth || 0
      )
      if (w >= PC_BREAKPOINT_WIDTH) {
        setMediaType("pc")
      } else {
        setMediaType("mobile")
      }
    }

    window.addEventListener("resize", handleResize)

    if (!initResize) {
      window.onresize = handleResize()
      setInitResize(true)
    }

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [initResize])

  return mediaType
}
