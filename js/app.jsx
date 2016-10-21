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
      animateSlideIn: '',
      animateContent: '',
      animateContentWrapper: ''
    };
  },
  handleClick: function() {
    clearInterval(this.state.interval);
    console.log('Darren Lim: Interval stopped');
    console.log('Darren Lim: Hero is set to FALSE');
    setTimeout(function() {
      this.setState({hero: false});
      if (this.state.breakup) {
        this.setState({animateSlideIn: 'enter'});
      }
    }.bind(this), 580);
    setTimeout(function() {
      this.setState({
        animateContent: 'enter',
        animateContentWrapper: 'enter'
      });
    }.bind(this), 1100);
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
    this.setState({ animateContent: 'exit' });
    setTimeout(function() {
      this.setState({
        currentTab: index,
        animateContent: 'enter'
      });
    }.bind(this), 400);
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
            <div className={'content-wrapper '+this.state.animateContentWrapper}>
              <div className={'content '+this.state.animateContent}>
                {this.state.navlist[this.state.currentTab].content}
              </div>
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

var aboutMeContents = (
  <div className="about">
    <h1>Lorem Ipsum</h1>
    <p>Lorem ipsum dolor sit amet,
    consectetur adipiscing elit. Praesent ut justo dapibus
    dui condimentum faucibus. Nam tincidunt risus risus, in
    elementum velit gravida sit amet. Curabitur sed arcu posuere,
    laoreet mi id, bibendum nisi. Duis malesuada scelerisque tellus,
    a sagittis leo rhoncus sed. Curabitur sollicitudin dui sed aliquet
    vestibulum. Duis in risus fringilla, rutrum neque facilisis,
    condimentum odio. Fusce laoreet enim diam, quis vestibulum velit
    tincidunt eget. Duis euismod, diam sit amet vestibulum rhoncus,
    ligula urna posuere eros, in condimentum dolor dolor vel nisi.
    Sed molestie sodales risus in molestie. Aliquam accumsan erat mauris,
    eget ullamcorper elit tempus eget. Integer nec ligula rutrum, porttitor
    erat sit amet, accumsan nisl. Sed placerat sed leo eu fringilla. Aenean
    eu tempus enim, id viverra eros.</p>
    <p>Aenean finibus ac est ac semper. Fusce lobortis placerat magna in posuere.
    Vestibulum ut mi ac ipsum pretium vulputate in vitae lacus. Quisque quis
    sapien ut metus bibendum pellentesque. Maecenas feugiat eu quam vitae elementum.
    Morbi mattis velit eu purus tempor aliquam id ut turpis. Donec nec ultricies
    erat, nec maximus elit. Nulla vitae urna orci.</p>
    <p>Morbi gravida, elit ac consequat tincidunt, ligula lorem lobortis mi, nec
    volutpat nulla massa ut nulla. Morbi augue est, tincidunt a ligula vitae,
    consectetur hendrerit neque. Praesent ut ultrices odio. Donec id leo massa.
    In tristique rhoncus est sed commodo. Donec ac nunc id lorem facilisis iaculis
    ut nec nisl. Donec ut ornare diam. Vivamus nec lacus in nisl tempor consectetur
    eget at enim. Duis dictum id erat non mattis. Mauris blandit tortor vel dolor
    gravida vestibulum. Morbi at ullamcorper erat, accumsan dignissim urna. Nunc
    ipsum libero, ornare in aliquet a, accumsan ut nisl. Phasellus ultrices neque
    id urna efficitur imperdiet. Phasellus porttitor nec ante vulputate ultrices.
    Nulla facilisi.</p>
    <p>In hac habitasse platea dictumst. Vivamus sed turpis eget libero elementum
    hendrerit. Sed quis leo diam. Aliquam congue sem nec erat tincidunt maximus
    nec at sem. Curabitur ante nisi, finibus vitae bibendum et, ornare dapibus
    dolor. Sed a luctus nulla, a ullamcorper libero. In euismod semper tortor,
    id efficitur est dignissim ac. Nullam eu semper magna, non molestie augue.
    Nam porta, massa eu condimentum porttitor, urna nunc laoreet est, sit amet
    pretium justo dolor et nibh. Nam varius nunc vel dolor vehicula rhoncus.</p>
    <p>Duis molestie iaculis eros, in ullamcorper nibh euismod dictum. Suspendisse
    suscipit ligula neque, egestas consequat turpis porttitor lobortis. Etiam
    congue malesuada libero a ullamcorper. Quisque ac aliquet neque. Donec
    malesuada massa id ornare euismod. Phasellus facilisis blandit augue quis
    blandit. In sit amet libero eget mi elementum tincidunt. Aliquam neque nisi,
    accumsan luctus sodales vel, laoreet non dui. Quisque dictum nec elit eget
    porttitor. Curabitur bibendum placerat nulla, quis aliquet metus ullamcorper
    id. Pellentesque habitant morbi tristique senectus et netus et malesuada
    fames ac turpis egestas. Proin feugiat tortor arcu, quis suscipit arcu
    volutpat blandit.</p>
  </div>
);

var navlist = [
  {
    id: 0,
    name: 'about',
    url: '/about',
    content: aboutMeContents

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
    name: 'skills',
    url: '/skills',
    content:
      <div className="skills">skills</div>
  },
  {
    id: 3,
    name: 'contact',
    url: '/contact',
    content:
      <div className="contact">contact</div>
  }
];

ReactDOM.render(<App />, document.getElementById('main'));
