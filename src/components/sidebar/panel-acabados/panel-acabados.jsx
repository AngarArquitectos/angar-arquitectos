import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Panel from "../panel";
import ModalAcabado from "./modal-acabado";
import imagenes from "./imagenes/export";

const imageContainerStyle = {
  display: "flex",
  justifyContent: "center",
};

const tabStyle = { margin: "1em" };

const previewStyles = {
  width: "300px",
  height: "auto",
};

export default class PanelAcabados extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isModalOpen: false,
      selectedImage: null,
      imagenes: imagenes,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal(selectedImage) {
    this.setState({ isModalOpen: true, selectedImage });
  }

  closeModal() {
    this.setState({ isModalOpen: false, selectedImage: null });
  }

  render() {
    const { isModalOpen, imagenes, selectedImage } = this.state;
    const imagePath = "./imagenes/";
    return (
      <Fragment>
        <Panel name={"Acabados"}>
          <Tabs id="acabadosTabs" style={tabStyle}>
            <TabList>
              {imagenes.map((imagen, index) => (
                <Tab key={index}>Acabado {index + 1}</Tab>
              ))}
            </TabList>
            {imagenes.map((imagen, index) => (
              <TabPanel key={index}>
                <div style={imageContainerStyle}>
                  <img
                    style={previewStyles}
                    src={imagen}
                    alt="Imagen"
                    onClick={() => this.openModal(imagen)}
                  />
                </div>
              </TabPanel>
            ))}
          </Tabs>
        </Panel>
        <ModalAcabado isOpen={isModalOpen} onRequestClose={this.closeModal} imagen={selectedImage} />
      </Fragment>
    );
  }
}

PanelAcabados.propTypes = {
  state: PropTypes.object.isRequired,
};
