// const CRM__HOST = 'crmdemo.twsamsungcampaign.com';
const PRE__HOST = 'crmdemo.twsamsungcampaign.com';
const PRO__HOST = 'crm.twsamsungcampaign.com';
const _URL = location.hostname;
const FB_APP_ID = (_URL.indexOf(PRO__HOST) !== -1) ? '1360448468040778' : '3413017992314622';
const LIFF_ID = (_URL.indexOf(PRO__HOST) !== -1) ? '1653834490-MA9W9YGk' : '1653780788-2lglgAqW';
let API__DOMAIN = '';

/*********************************************/

function gtag_pageView(_key) {
  //ga('send', 'pageview', key);
  gtag('config', GTAG_TRACKING_ID, {
    'page_title': _key,
    'page_path': '/' + _key
  });

  // console.log("gtag_pageView: " + _key);
}

function gtag_ButtonClick(_key) {
  //ga('send', 'event', 'Button', 'Click', key);
  gtag('event', 'Click', { 'event_category': 'Button', 'event_label': _key });

  // console.log("gtag_ButtonClick: " + _key);
}

function setDefault(_textbox, _value) { // depend on jQuery
  $(_textbox).val(_value).css({ opacity: .4 });
  $(_textbox).focus(
    function () {
      if ($(this).val() == _value) {
        $(this).val('').css({ opacity: 1 });
      }
    })
    .blur(function () {
      if ($(this).val() == '') {
        $(this).val(_value).css({ opacity: .4 });
      }
    });
}

function setParameterByName(name, value, url) {
  if (!url) url = window.location.href;
  var re = new RegExp("([?|&])" + name + "=.*?(&|$)", "i");
  separator = url.indexOf('?') !== -1 ? "&" : "?";
  if (url.match(re)) {
    return url.replace(re, '$1' + name + "=" + value + '$2');
  }
  else {
    return url + separator + name + "=" + value;
  }
}

function getParameterByName(name, url) {
  if (!url) url = decodeURIComponent(window.location.href);
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return '';
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function POST(theUrl, theData) {
  const _url = API__DOMAIN + theUrl;
  console.log('_url', _url);
  console.log('theData', theData);
  return fetch(_url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams(theData),
  })
  .then((response) => {
    return response.json(); 
  }).then((jsonData) => {
    const success = jsonData.success || jsonData.succ || false ;
    const msg = jsonData.msg || jsonData.err || '' ;
    if (!success) {
      throw new Error(msg);
    }
    return jsonData;
  }).catch((err) => {
    throw new Error(err);
  });
}

function GET(theUrl, theData) {
  const _url = API__DOMAIN + theUrl +'?' + new URLSearchParams(theData).toString();
  return fetch(_url, {})
    .then((response) => {
      return response.json(); 
    }).then((jsonData) => {
      const success = jsonData.success || jsonData.succ || false ;
      const msg = jsonData.msg || jsonData.err || '' ;
      if (!success) {
        throw new Error(msg);
      }
      return jsonData;
    }).catch((err) => {
      throw new Error(err);
  });
}


/*********************************/


var isMobile = false;
var isIE = false;

utlis = function () {

  //private menbers
  //TEST Data  
  let lineUserId = '';
  let isPRE = false;

  //private methods
  function init() {
    console.log('utlis loaded', window.location.href);

    // window.alert = function () { 
    //   var _arg0 = arguments[0];
    //   // console.log(_arg0);
    //   var _alert = $('<div class="custom__alert"><div class="custom__alert__container"><div class="custom__alert__content"><div class="custom__alert__text"><p></p></div><div class="simple__btn custom__alert__btn"><p>確認</p></div></div></div></div>');
    //   _alert.appendTo('body');
    //   _alert.find('.custom__alert__text p').html(_arg0);
    //   _alert.find('.custom__alert__btn').click(function (e) { 
    //     e.preventDefault();
    //     $('.custom__alert').hide();
    //   });
    // }
  }

  function getLineUserId(_callback) {
    if (getParameterByName('lineUserId') !== '') {
      lineUserId = getParameterByName('lineUserId');
      console.log('has lineUserId:', lineUserId);
      _callback(lineUserId);
    } else {

      console.log('未能讀取您的 Line Id，請退出後重試');
      _callback(false);
    }
    console.log('utlis getLineUserId:', lineUserId);

  }

  //constructor

  {
    if ($('html').is('.ie6, .ie7, .ie8')) {
      isIE = true;
      // alert('.ie6, .ie7, .ie8');
    }

    var _URL = location.hostname;
    var _host;


    if (_URL.indexOf(PRE__HOST) != -1) {
      _host = PRE__HOST;
      isPRE = true;

    } else if (_URL.indexOf(PRO__HOST) != -1) {
      _host = PRO__HOST;
    } else {
      _host = PRE__HOST;
      isPRE = true;
    }

    API__DOMAIN = 'https://' + _host + '/';
    // console.log('API__DOMAIN : ' + API__DOMAIN);

    $(document).ready(function () {
      // var vConsole = new VConsole();

      if ($('body').width() <= 640) {
        isMobile = true;
      } else {
        isMobile = false;
      }

      init();

      // if(isPRE && VConsole){
      //   var vConsole = new VConsole();
      // }
    });
  }

  //public

  return {
    getLineUserId: function (_callback) {
      getLineUserId(_callback);
    }
    ,isPRE
  }
}

utlis = new utlis();