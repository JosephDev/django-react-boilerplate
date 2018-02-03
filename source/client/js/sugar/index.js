import moment from 'moment';


export function timeAgo(givenTime) {
  const now = moment();
  const given = moment(givenTime);

  const diff = Math.round(moment.duration(now.diff(given)).asDays());

  if (diff === 1) {
    return 'Yesterday';
  } else if (diff > 1) {
    return given.format('MM/DD/YY');
  }

  return given.format('LT');
}

/**
* Get value of URL query parameter by its name.
* @param {string} name - name of a query parameter
* @param {string} url (optional) - URL to pull query parameter from
* If URL is not given, it uses URL of the page that this function is being used in.
*/
export function getParameterByName(name, url, escapeCross) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  if (escapeCross) {
    return decodeURIComponent(results[2]);
  }

  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

/**
* Convert URL query parameters into dictionary object
* @param {string} searchString - URL query parameter
* @return {Object} obj - dictionary containing query parameters
* If searchString is not given, it uses search string of the page that this function is being used in.
*/
export function convertParamsToObj(searchString) {
  const obj = {};

  if (searchString) {
    searchString.split('?')[1].split('&').map((query) => {
      const params = query.split('=');
      obj[params[0]] = params[1];
    });
  } else {
    if (location.search) {
      location.search.split('?')[1].split('&').map((query) => {
        const params = query.split('=');
        obj[params[0]] = params[1];
      });
    }
  }

  return obj;
}

/**
* Return URL combined with query parameters
* @param {string} url - base URL
* @param {string} data - query parameter in dictionary form
*/
export function encodeParamsToURI(url, data) {
  const param = "?" + Object.keys(data).map(function(k) {
    // NOTE: %2B replacement logic has been added to prevent problem that occurs when
    //       there is a "+" string inside the search query. This is a temporary fix.
    return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]).replace(/%2B/g, '+');
  }).join('&');

  return `${ url }${ param }`;
}
