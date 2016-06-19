import React, {Component, PropTypes} from 'react';
import vis from 'vis';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {load} from 'redux/modules/nodes';

@connect(
    state => ({nodes: state.nodes.data}),
    dispatch => bindActionCreators({load}, dispatch))
export default class Graph extends Component {
  static propTypes = {
    nodes: PropTypes.object,
    load: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props);
    this.updateGraph = this.updateGraph.bind(this);
  }

  componentDidMount() {
    this.updateGraph();
  }

  componentDidUpdate() {
    this.updateGraph();
  }

  updateGraph() {
    const {nodes, load} = this.props; // eslint-disable-line
    const container = document.getElementById('vis-graph');
    const data = {
      nodes: nodes.nodes,
      edges: nodes.edges,
    };
    const options = {
      height: '600',
      nodes: {
        shape: 'dot',
        size: 20,
        font: {
          size: 15,
          color: '#ffffff'
        },
        borderWidth: 2
      },
      edges: {
        width: 2
      },
      groups: {
        diamonds: {
          color: {
            background: 'red',
            border: 'white'
          },
          shape: 'diamond'
        },
        dotsWithLabel: {
          label: "I'm a dot!",
          shape: 'dot',
          color: 'cyan'
        },
        mints: {
          color: 'rgb(0,255,140)'
        },
        giant: {
          shape: 'icon',
          icon: {
            face: 'FontAwesome',
            code: '\uf0a3',
            size: 60,
            color: 'pink'
          }
        },
        star: {
          shape: 'icon',
          icon: {
            face: 'FontAwesome',
            code: '\uf005',
            size: 60,
            color: 'yellow'
          }
        },
        source: {
          color: {
            border: 'white'
          }
        }
      }
    };

    const network = new vis.Network(container, data, options);

    network.on('click', () => {
      load().then((eee) => {
        console.log(eee);
      });
    });

    return network;
  }

  render() {
    return (<div id="vis-graph"> </div>);
  }
}
