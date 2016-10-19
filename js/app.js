var Tab = React.createClass({displayName: "Tab",
  getInitialState: function() {
    return {
      initialize: ''
    };
  },
  componentDidMount: function() {
    setTimeout(function() {
      this.setState({initialize: 'init'});
    }.bind(this), 300);
  },
  click: function(event) {
    event.preventDefault();
    this.props.click();
  },
  render: function() {
    return (
      React.createElement("li", {className: this.props.isCurrent ? 'active '+this.state.initialize : this.state.initialize}, 
        React.createElement("a", {onClick: this.click, href: this.props.url}, 
          this.props.name
        )
      )
    );
  }
});

var Nav = React.createClass({displayName: "Nav",
  click: function(tab) {
    this.props.changeTab(tab);
  },
  render: function() {
    return (
      React.createElement("nav", null, 
        React.createElement("ul", null, 
          this.props.navlist.map(function(tab, index) {
            return (
              React.createElement(Tab, {
                click: this.click.bind(this, index), 
                key: tab.id, 
                url: tab.url, 
                name: tab.name, 
                isCurrent: (this.props.currentTab === index)}
              )
            );
          }.bind(this))
        )
      )
    );
  }
});

var App = React.createClass({displayName: "App",
  getInitialState: function() {
    return {
      hero: true,
      navlist: navlist,
      welcome: welcome,
      counter: 0,
      currentTab: 0,
      classActive: '',
      rightImgInit: '',
      leftImgInit: '',
      buttonInit: '',
      buttonInnerInit: '',
      nameInit: '',
      arrowInit: '',
      breakup: false,
      slideInit: ''
    };
  },
  handleClick: function() {
    setTimeout(function() {
      this.setState({hero: false});
      if (this.state.breakup) {
        this.setState({slideInit: 'init'});
      }
      clearInterval(this.state.interval);
      console.log('Darren Lim: Interval stopped');
      console.log('Darren Lim: Hero is set to FALSE');
    }.bind(this), 580);
  },
  handleClickSlide: function() {
    this.setState({
      classActive: 'animate-slide',
      nameInit: '',
      arrowInit: ''
    });
    this.handleClick();
  },
  handleClickBreakup: function() {
    this.setState({
      buttonInit: 'exit',
      nameInit: 'exit',
      arrowInit: 'exit',
      breakup: true
    });
    setTimeout(function() {
      this.setState({classActive: 'animate-breakup'});
      this.handleClick();
    }.bind(this), 300);
  },
  changeTab: function(index) {
    this.setState({ currentTab: index });
  },
  componentDidMount: function() {
    if (this.state.hero) {
      setTimeout(function() {
        var interval = setInterval(this.countTimer, 1200);
        this.setState({ interval: interval });
        console.log('Darren Lim: Interval initialized');
      }.bind(this), 1200);
    }
    setTimeout(function() {
      this.setState({
        rightImgInit: 'init',
        leftImgInit: 'init'
      });
    }.bind(this), 100);
    setTimeout(function() {
      this.setState({buttonInit: 'init'});
    }.bind(this), 1200);
    setTimeout(function() {
      this.setState({
        nameInit: 'init',
        buttonInnerInit: 'init',
        arrowInit: 'init'
      });
    }.bind(this), 2000);
  },
  countTimer: function() {
    if (this.state.counter >= welcome.length-1) {
      this.setState({ counter: 0 });
    }
    else {
      this.setState({ counter: this.state.counter+1 });
    }
    console.log('Darren Lim: Counter');
  },
  render: function() {
    var component;
    if (this.state.hero) {
      component = (
        React.createElement("div", {id: "hero", className: this.state.classActive}, 
          React.createElement("div", {className: 'image-container image-bg '+this.state.rightImgInit}, 
            React.createElement("div", {className: "image"})
          ), 
          React.createElement("div", {className: 'image-container image-non '+this.state.leftImgInit}, 
            React.createElement("div", {className: "image"})
          ), 
          React.createElement("div", {className: 'button '+this.state.buttonInit, 
               onClick: this.handleClickBreakup}, 
            React.createElement("div", {className: this.state.buttonInnerInit}), 
            React.createElement("span", null, this.state.welcome[this.state.counter])
          ), 
          React.createElement("div", {className: 'name '+this.state.nameInit, 
               onClick: this.handleClickSlide}, "Darren Lim"), 
          React.createElement("div", {className: 'arrow '+this.state.arrowInit, 
               onClick: this.handleClickSlide}, 
            React.createElement("div", {id: "upperline"}), 
            React.createElement("div", {id: "lowerline"})
          )
        )
      );
    }
    else {
      component = (
        React.createElement("div", {id: "main-wrapper"}, 
          React.createElement("div", {id: "sidebar", className: this.state.slideInit}, 
            React.createElement(Nav, {
              currentTab: this.state.currentTab, 
              navlist: this.state.navlist, 
              changeTab: this.changeTab}
            )
          ), 
          React.createElement("div", {id: "page", className: this.state.slideInit}, 
            React.createElement("div", {className: "content"}, 
              this.state.navlist[this.state.currentTab].content
            )
          )
        )
      );
    }

    return (
      React.createElement("div", null, 
        component
      )
    );
  }
});

var welcome = [
  'Welcome',
  'Bienvenue',
  '欢迎',
  'Velkommen',
  'Bienvenido',
  '歡迎',
  'Willkommen',
  'Välkommen',
  'ようこそ'
];

var navlist = [
  {
    'name': 'about me',
    'url': '/about',
    'content':
      React.createElement("div", {className: "about"}, "stuff")
  },
  {
    'name': 'portfolio',
    'url': '/portfolio',
    'content':
      React.createElement("div", {className: "portfolio"}, "portfolio")
  },
  {
    'name': 'my skills',
    'url': '/skills',
    'content':
      React.createElement("div", {className: "skills"}, "skills")
  },
  {
    'name': 'contact me',
    'url': '/contact',
    'content':
      React.createElement("div", {className: "contact"}, "contact")
  }
];

ReactDOM.render(React.createElement(App, null), document.getElementById('main'));