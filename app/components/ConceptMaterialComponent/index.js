/**
 *
 * ConceptMaterialComponent
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import { Link } from 'react-router-dom';
import Typography from 'antd/lib/typography';
import DescriptionCard from 'components/DescriptionCard';
import NavigationBar from '../NavigationBar';
import Divider from 'antd/lib/divider';
import Modal from 'antd/lib/modal';
const { Title } = Typography;

function ConceptMaterialComponent(props) {
  const { games } = props;
  const { readingMaterials } = props;
  const { parentConcept } = props;
  const { parentTopic } = props;

  return (
    <div>
      {parentTopic && (
        <NavigationBar prevPageText="Back to Concepts" prevPageLink={`/topics/${parentTopic}`} />
      )}
      <Row
        style={{ padding: '20px', margin: 0 }}
        gutter={[16, 16]}
      >
        <Col
          span={24}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {readingMaterials &&
            <Title style={{ textAlign: 'center' }}>{readingMaterials.conceptName}</Title>
          }
        </Col>
        <Divider />
        <Col
          span={24}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Title style={{ textAlign: 'center' }} level={2}>Reading Materials</Title>
        </Col>
        {readingMaterials && readingMaterials.rmArray
          ? readingMaterials.rmArray.map((key, idx) => (
            <Col xs={{ span: 24 }} xl={{ span: 8 }}>
              <Link to={`/reading-material/${parentTopic}/${parentConcept}/${key.id}`} onClick={() => {
                this.forceUpdate();
              }}>
                <DescriptionCard
                  title={`Reading Material : ${idx + 1}`}
                  progress={key.read ? 100 : 0}
                />
              </Link>
            </Col>
          ))
          : null}
      </Row>

      {games && games.length > 0 &&
        <Row
          style={{ padding: '40px 40px 20px 40px', margin: 0 }}
          gutter={[16, 16]}
        >
          <Col
            span={24}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Title style={{ textAlign: 'center' }} level={2}>Practice Games</Title>
          </Col>
          {games
            ? (games.length > 0 ? games.map((key, idx) => (
              <Col xs={{ span: 24 }} xl={{ span: 8 }}>
                <Link to={`${key.link}${parentTopic}/${parentConcept}/${key.id}/1`} onClick={() => {
                  this.forceUpdate();
                }}>
                  <DescriptionCard
                    title={`Practice Game : ${idx + 1}`}
                    description={key.name}
                    progress={Math.round(key.progress * 100)}
                    suggestionText={key.maxScore}
                    practiceGame
                  />
                </Link>
              </Col>
            )) : <Title>Coming soon!</Title>)
            : null}
        </Row>
      }

      {games && games.length > 0 &&
        <Row
          style={{ padding: '40px 40px 20px 40px', margin: 0 }}
          gutter={[16, 16]}
        >
          <Col
            span={24}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Title style={{ textAlign: 'center' }} level={2}>Graded Games</Title>
          </Col>
          {games
            ? (games.length > 0 ? games.map((key, idx) => (
              <Col xs={{ span: 24 }} xl={{ span: 8 }}>
                <Link to={key.graded_done ? '/' : `/graded-quiz${key.link}${parentTopic}/${parentConcept}/${key.id}`} onClick={() => {
                  props.setModalVisiblity(true);
                  console.log(props.modalVisible);
                }}>
                  <DescriptionCard
                    title={`Graded Game : ${idx + 1}`}
                    description={key.name}
                    progress={key.graded_done ? 100 : 0}
                    gradedGame
                    suggestionText={"You are left with " + key.attempts_left + " attempts. Your average score in this test is " + key.graded_score + "%"}
                  // onClick={() => {
                  //   props.setModalVisiblity(true);
                  // }}
                  />
                </Link>
              </Col>
            )) : <Title>Coming soon!</Title>)
            : null}
        </Row>
      }
      <Modal
        title="Important !!">
        visible={props.modalVisible}
        onOk={() => {
          props.setModalVisiblity(false);
        }}
        onCancel={() => {
          props.setModalVisiblity(false);
          
        }}

      </Modal>
    </div>
  );
}

ConceptMaterialComponent.propTypes = {};

export default memo(ConceptMaterialComponent);
