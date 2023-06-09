import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Panel from "./panel";
import {
  MODE_IDLE,
  MODE_2D_ZOOM_IN,
  MODE_2D_ZOOM_OUT,
  MODE_2D_PAN,
  MODE_3D_VIEW,
  MODE_3D_FIRST_PERSON,
  MODE_WAITING_DRAWING_LINE,
  MODE_DRAWING_LINE,
  MODE_DRAWING_HOLE,
  MODE_DRAWING_ITEM,
  MODE_DRAGGING_LINE,
  MODE_DRAGGING_VERTEX,
  MODE_DRAGGING_ITEM,
  MODE_DRAGGING_HOLE,
  MODE_FITTING_IMAGE,
  MODE_UPLOADING_IMAGE,
  MODE_ROTATING_ITEM,
} from "../../constants";
import * as SharedStyle from "../../shared-style";
import { FaTrash } from "react-icons/fa";
import { filterName, filterPrices } from "../../utils/filter";
import { formatNumber } from "../../utils/formatter";

const VISIBILITY_MODE = {
  MODE_IDLE,
  MODE_2D_ZOOM_IN,
  MODE_2D_ZOOM_OUT,
  MODE_2D_PAN,
  MODE_3D_VIEW,
  MODE_3D_FIRST_PERSON,
  MODE_WAITING_DRAWING_LINE,
  MODE_DRAWING_LINE,
  MODE_DRAWING_HOLE,
  MODE_DRAWING_ITEM,
  MODE_DRAGGING_LINE,
  MODE_DRAGGING_VERTEX,
  MODE_DRAGGING_ITEM,
  MODE_DRAGGING_HOLE,
  MODE_FITTING_IMAGE,
  MODE_UPLOADING_IMAGE,
  MODE_ROTATING_ITEM,
};

const contentArea = {
  height: "auto",
  maxHeight: "15em",
  overflowY: "auto",
  padding: "0.25em 1.15em",
  cursor: "pointer",
  marginBottom: "1em",
  userSelect: "none",
};

const elementStyle = {
  width: "auto",
  height: "2.5em",
  margin: "0.25em 0.25em 0 0",
  padding: "0.5em",
  textAlign: "left",
  display: "inline-block",
  border: "1px solid " + SharedStyle.COLORS.white,
  borderRadius: "0.2em",
};

const elementSelectedStyle = {
  width: "auto",
  height: "2.5em",
  margin: "0.25em 0.25em 0 0",
  padding: "0.5em",
  textAlign: "left",
  display: "inline-block",
  border: "1px solid",
  borderRadius: "0.2em",
  color: SharedStyle.SECONDARY_COLOR.main,
  borderColor: SharedStyle.SECONDARY_COLOR.main,
};

const categoryDividerStyle = {
  paddingBottom: "0.5em",
  borderBottom: "1px solid #888",
};

const importeStyle = {
  borderBottom: "1px solid #888",
  paddingTop: "0.5em",
  textAlign: "right",
};

const tableSearchStyle = { width: "100%", marginTop: "0.8em" };
const searchIconStyle = { fontSize: "1.5em" };
const searchInputStyle = {
  fontSize: "1em",
  width: "100%",
  height: "1em",
  padding: "1em 0.5em",
};

const iconStyle = {
  fontSize: "14px",
  margin: "2px",
  cursor: "pointer",
};

const tableTabStyle = {
  width: "100%",
  textAlign: "left",
};

export default class PanelLayerElement extends Component {
  constructor(props, context) {
    super(props, context);

    let layer = props.layers.get(props.selectedLayer);
    let elements = {
      lines: layer.lines,
      holes: layer.holes,
      items: layer.items,
    };

    this.state = {
      elements,
      matchString: "",
      matchedElements: elements,
      presupuesto: 0,
      presupuesto1: 0,
      presupuesto2: 0,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.matchString !== nextState.matchString) return true;

    let oldElements = this.state.elements;
    let newElements = nextState.elements;

    if (
      oldElements.lines.hashCode() !== newElements.lines.hashCode() ||
      oldElements.holes.hashCode() !== newElements.holes.hashCode() ||
      oldElements.items.hashCode() !== newElements.items.hashCode()
    )
      return true;

    return false;
  }

  componentWillReceiveProps(nextProps) {
    let layer = nextProps.layers.get(nextProps.selectedLayer);

    if (this.props.layers.hashCode() === nextProps.layers.hashCode()) return;

    let elements = {
      lines: layer.lines,
      holes: layer.holes,
      items: layer.items,
    };

    if (this.state.matchString !== "") {
      let regexp = new RegExp(this.state.matchString, "i");
      let filterCb = (el) => regexp.test(el.get("name"));

      this.setState({
        matchedElements: {
          elements,
          lines: elements.lines.filter(filterCb),
          holes: elements.holes.filter(filterCb),
          items: elements.items.filter(filterCb),
        },
      });
    } else {
      this.setState({ elements, matchedElements: elements });
    }

    let tempPresupuesto = 0;
    let tempPresupuesto1 = 0;
    let tempPresupuesto2 = 0;

    elements.items.forEach((item) => {
      const itemName = item.get("name");
      const prices = filterPrices(itemName);

      tempPresupuesto += parseFloat(prices[0]);
      tempPresupuesto1 += parseFloat(prices[1]);
      tempPresupuesto2 += parseFloat(prices[2]);
    });

    const isEmpty = elements.items.isEmpty();
    const presupuesto = isEmpty ? 0 : formatNumber(tempPresupuesto);
    const presupuesto1 = isEmpty ? 0 : formatNumber(tempPresupuesto1);
    const presupuesto2 = isEmpty ? 0 : formatNumber(tempPresupuesto2);

    this.setState({
      presupuesto,
      presupuesto1,
      presupuesto2,
    });
  }

  matcharray(text) {
    if (text === "") {
      this.setState({
        matchString: "",
        matchedElements: this.state.elements,
      });
      return;
    }

    let regexp = new RegExp(text, "i");
    let filterCb = (el) => regexp.test(el.get("name"));

    this.setState({
      matchString: text,
      matchedElements: {
        lines: this.state.elements.lines.filter(filterCb),
        holes: this.state.elements.holes.filter(filterCb),
        items: this.state.elements.items.filter(filterCb),
      },
    });
  }

  render() {
    if (!VISIBILITY_MODE[this.props.mode]) return null;

    let layer = this.props.layers.get(this.props.selectedLayer);
    const { presupuesto, presupuesto1, presupuesto2 } = this.state;
    return (
      <Panel name={"Presupuesto"}>
        <div style={contentArea} onWheel={(e) => e.stopPropagation()}>
          {this.state.matchedElements.items.count() ? (
            <div>
              <p style={categoryDividerStyle}>
                {this.context.translator.t("Módulos")}
              </p>
              <table style={tableTabStyle}>
                <tbody>
                  {this.state.matchedElements.items
                    .entrySeq()
                    .map(([itemID, item]) => {
                      let name = filterName(item.name);
                      let prices = filterPrices(item.name)
                      let formatedPrices = formatNumber(prices[0])
                      return (
                        <tr
                          key={itemID}
                          style={
                            item.selected ? elementSelectedStyle : elementStyle
                          }
                        >
                          <td
                            onClick={(e) =>
                              this.context.itemsActions.selectItem(
                                layer.id,
                                item.id
                              )
                            }
                            style={{ width: "30em" }}
                          >
                            {name}
                            {": "}
                            {formatedPrices}€
                          </td>
                          <td style={{ width: "5em" }}>
                            {/*<FaPencil style={iconStyle} />*/}
                            <FaTrash
                              style={iconStyle}
                              onClick={(e) => {
                                this.context.itemsActions.selectItem(
                                  layer.id,
                                  item.id
                                );
                                this.context.projectActions.remove();
                              }}
                            />
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          ) : null}
          {this.state.matchedElements.items.count() ||
          this.state.matchedElements.lines.count() ||
          this.state.matchedElements.holes.count() ? (
            <Fragment>
              <div style={importeStyle}>
                <b>{"TOTAL ACABADO NORMAL: "}</b>
                {presupuesto}€
              </div>
              <div style={importeStyle}>
                <b>{"TOTAL ACABADO 1: "}</b>
                {presupuesto1}€
              </div>
              <div style={importeStyle}>
                <b>{"TOTAL ACABADO 2: "}</b>
                {presupuesto2}€
              </div>
            </Fragment>
          ) : null}
        </div>
      </Panel>
    );
  }
}

PanelLayerElement.propTypes = {
  mode: PropTypes.string.isRequired,
  layers: PropTypes.object.isRequired,
  presupuesto: PropTypes.number.isRequired,
};

PanelLayerElement.contextTypes = {
  catalog: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired,
  priceActions: PropTypes.object.isRequired,
  itemsActions: PropTypes.object.isRequired,
  linesActions: PropTypes.object.isRequired,
  holesActions: PropTypes.object.isRequired,
  projectActions: PropTypes.object.isRequired,
};
