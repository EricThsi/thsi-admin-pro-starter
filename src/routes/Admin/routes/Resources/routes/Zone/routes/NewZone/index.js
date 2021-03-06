import { injectReducer } from 'vstore/reducers'

export default (store) => ({
  path: 'new',
  /*  Async getComponent is only invoked when route matches   */
  getComponent(nextState, next) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([
      './containers/NewZoneContainer.js',
      // './modules/userList'
    ], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const newZone = require('./containers/NewZoneContainer').default
      const newZoneReducer = require('./modules/NewZoneModule').default

      /*  Add the reducer to the store on key 'User'  */
      injectReducer(store, {
        key: 'newZone',
        reducer: newZoneReducer
      })
      // const userListReducer = require('./modules/userList').default

      /*  Add the reducer to the store on key 'User'  */
      // injectReducer(store, {
      //   key: 'userSeller',
      //   reducer: userListReducer
      // })

      /*  Return getComponent   */
      next(null, newZone)
    })
  }
})
