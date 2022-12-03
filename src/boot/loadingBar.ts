import { boot } from 'quasar/wrappers'
import { LoadingBar } from 'quasar'

export default boot(() => {
  LoadingBar.setDefaults({
    color: 'primary'
  })
})
