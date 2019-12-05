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
  proxyUrl: localStorage.getItem('proxyUrl') || 'https://subject-assistant-proxy.zooniverse.org',
  hamletUrl: (env === 'production')
    ? 'https://hamlet-staging.zooniverse.org/'
    : 'https://hamlet-staging.zooniverse.org/',
  panoptesAppId: (env === 'production')
    ? '9177dbfa64561b23b3089efedd75b0a52b8aa5a5c9de18cf966670cd3b0f4449'
    : '5243dacf3a321843b1bca09047edfbac5eb39dba14f1be06a0a54dfe6a098694',
}

export { env }
export default config
