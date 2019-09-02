var DEFAULT_ENV = 'development';
var envFromBrowser = locationMatch(/\W?env=(\w+)/);
var envFromShell = process.env.NODE_ENV;
var env = envFromBrowser || envFromShell || DEFAULT_ENV;

function locationMatch (regex) {
  const match = window.location && location.search.match(regex)
  return (match && match[1]) ? match[1] : undefined
}

if (!env.match(/^(production|staging|development)$/)) {
  throw new Error(`Error: Invalid Environment - ${envFromShell}`);
}

const config = {
  appRootUrl: localStorage.getItem('appRootUrl') || `${window.location.origin}${window.location.pathname}`,
  mlServiceUrl: localStorage.getItem('mlServiceUrl') || 'https://www.zooniverse.org/api',
  proxyUrl: localStorage.getItem('proxyUrl') || 'http://localhost:3666',
  panoptesAppId: (env === 'production')
    ? ''
    : '5243dacf3a321843b1bca09047edfbac5eb39dba14f1be06a0a54dfe6a098694'
}

export { env }
export default config
