const config = {
  appRootUrl: localStorage.getItem('appRootUrl') || `${window.location.origin}${window.location.pathname}`,
  mlServiceUrl: localStorage.getItem('mlServiceUrl') || 'https://www.zooniverse.org/api',
}

export default config
