// output: app.js
var Tab = React.createClass({
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
      <li className={this.props.isCurrent ? 'active '+this.state.initialize : this.state.initialize}>
        <a onClick={this.click} href={this.props.url}>
          {this.props.name}
        </a>
      </li>
    );
  }
});

var Nav = React.createClass({
  click: function(tab) {
    this.props.changeTab(tab);
  },
  render: function() {
    return (
      <nav>
        <ul>
          {this.props.navlist.map(function(tab, index) {
            return (
              <Tab
                click={this.click.bind(this, index)}
                key={tab.id}
                url={tab.url}
                name={tab.name}
                isCurrent={(this.props.currentTab === index)}
              />
            );
          }.bind(this))}
        </ul>
      </nav>
    );
  }
});

var App = React.createClass({
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
        <div id="hero" className={this.state.classActive}>
          <div className={'image-container image-bg '+this.state.rightImgInit}>
            <div className="image"></div>
          </div>
          <div className={'image-container image-non '+this.state.leftImgInit}>
            <div className="image"></div>
          </div>
          <div className={'button '+this.state.buttonInit}
               onClick={this.handleClickBreakup}>
            <div className={this.state.buttonInnerInit}></div>
            <span>{this.state.welcome[this.state.counter]}</span>
          </div>
          <div className={'name '+this.state.nameInit}
               onClick={this.handleClickSlide}>Darren Lim</div>
          <div className={'arrow '+this.state.arrowInit}
               onClick={this.handleClickSlide}>
            <div id="upperline"></div>
            <div id="lowerline"></div>
          </div>
        </div>
      );
    }
    else {
      component = (
        <div id="main-wrapper">
          <div id="sidebar" className={this.state.slideInit}>
            <Nav
              currentTab={this.state.currentTab}
              navlist={this.state.navlist}
              changeTab={this.changeTab}
            />
          </div>
          <div id="page" className={this.state.slideInit}>
            <div className="content">
              {this.state.navlist[this.state.currentTab].content}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        {component}
      </div>
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
      <div className="about">stuff</div>
  },
  {
    'name': 'portfolio',
    'url': '/portfolio',
    'content':
      <div className="portfolio">portfolio</div>
  },
  {
    'name': 'my skills',
    'url': '/skills',
    'content':
      <div className="skills">skills</div>
  },
  {
    'name': 'contact me',
    'url': '/contact',
    'content':
      <div className="contact">contact</div>
  }
];

ReactDOM.render(<App />, document.getElementById('main'));
