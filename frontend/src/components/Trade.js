import React, { Component } from 'react';
class Trade extends Component {
    constructor(props) {
      super(props);
      this.myRef = React.createRef();
    }
  
    componentDidMount() {
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js'
      script.async = true;
      script.innerHTML = JSON.stringify({

        
          "symbol": "BITSTAMP:BTCUSD",
          "width": 350,
          "height": 220,
          "locale": "en",
          "dateRange": "12M",
          "colorTheme": "light",
          "trendLineColor": "#37a6ef",
          "underLineColor": "#E3F2FD",
          "isTransparent": false,
          "autosize": false,
          "largeChartUrl": ""
       
      })
      this.myRef.current.appendChild(script);
    }
  
    render() {
      return(
      <div className="tradingview-widget-container" ref={this.myRef}>
          <div className="tradingview-widget-container__widget"></div>    
      </div>
      );
    }
  }


export default Trade;