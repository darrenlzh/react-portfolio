// output: app.js
var Tab = React.createClass({
  getInitialState: function() {
    return {
      animateS: ''
    };
  },
  componentDidMount: function() {
    setTimeout(function() {
      this.setState({animate: 'enter'});
    }.bind(this), 300);
  },
  click: function(event) {
    event.preventDefault();
    this.props.click();
  },
  render: function() {
    return (
      <li className={this.props.isCurrent ? 'active '+this.state.animate : this.state.animate}>
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
      breakup: false,
      animateHero: '',
      animateRightImage: '',
      animateLeftImage: '',
      animateHeroButton: '',
      animateHeroButtonInner: '',
      animateHeroName: '',
      animateHeroArrow: '',
      animateSlideIn: ''
    };
  },
  handleClick: function() {
    setTimeout(function() {
      this.setState({hero: false});
      if (this.state.breakup) {
        this.setState({animateSlideIn: 'enter'});
      }
      clearInterval(this.state.interval);
      console.log('Darren Lim: Interval stopped');
      console.log('Darren Lim: Hero is set to FALSE');
    }.bind(this), 580);
  },
  handleClickSlide: function() {
    this.setState({
      animateHero: 'animate-slide',
      animateHeroName: '',
      animateHeroArrow: ''
    });
    this.handleClick();
  },
  handleClickBreakup: function() {
    this.setState({
      animateHeroButton: 'exit',
      animateHeroName: 'exit',
      animateHeroArrow: 'exit',
      breakup: true
    });
    setTimeout(function() {
      this.setState({animateHero: 'animate-breakup'});
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
        animateRightImage: 'enter',
        animateLeftImage: 'enter'
      });
    }.bind(this), 100);
    setTimeout(function() {
      this.setState({animateHeroButton: 'enter'});
    }.bind(this), 1200);
    setTimeout(function() {
      this.setState({
        animateHeroName: 'enter',
        animateHeroButtonInner: 'enter',
        animateHeroArrow: 'enter'
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
        <div id="hero" className={this.state.animateHero}>
          <div className={'image-container image-bg '+this.state.animateRightImage}>
            <div className="image"></div>
          </div>
          <div className={'image-container image-non '+this.state.animateLeftImage}>
            <div className="image"></div>
          </div>
          <div className={'button '+this.state.animateHeroButton}
               onClick={this.handleClickBreakup}>
            <div className={this.state.animateHeroButtonInner}></div>
            <span>{this.state.welcome[this.state.counter]}</span>
          </div>
          <div className={'name '+this.state.animateHeroName}
               onClick={this.handleClickSlide}>Darren Lim</div>
          <div className={'arrow '+this.state.animateHeroArrow}
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
          <div id="sidebar" className={this.state.animateSlideIn}>
            <Nav
              currentTab={this.state.currentTab}
              navlist={this.state.navlist}
              changeTab={this.changeTab}
            />
          </div>
          <div id="page" className={this.state.animateSlideIn}>
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
    id: 0,
    name: 'about me',
    url: '/about',
    content:
      <div className="about">stuff</div>
  },
  {
    id: 1,
    name: 'portfolio',
    url: '/portfolio',
    content:
      <div className="portfolio">portfolio</div>
  },
  {
    id: 2,
    name: 'my skills',
    url: '/skills',
    content:
      <div className="skills">skills</div>
  },
  {
    id: 3,
    name: 'contact me',
    url: '/contact',
    content:
      <div className="contact">contact</div>
  }
];

ReactDOM.render(<App />, document.getElementById('main'));
