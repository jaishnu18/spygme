/**
 *
 * ReadingMaterialNavigation
 *
 */

import React, { memo, useState } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import Col from 'antd/lib/col';
import Button from 'antd/lib/button';
import BackImage from 'images/back.png';
import Icons from 'components/IconBox';
import H1 from 'components/atoms/H1';

import {
  EditorState,
  convertFromRaw,
  convertToRaw,
  Editor,
  ContentState,
  convertFromHTML,
} from 'draft-js';

import { Link } from 'react-router-dom';

import useMediaQuery from 'utils/useMediaQuery';

import { Wrapper } from '../ConceptMaterialNavigation';

function ReadingMaterialNavigation(props) {
  const isDesktop = useMediaQuery('(min-width: 960px)');

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onEditorStateChange = editorState => {
    setEditorState(editorState);
  };

  return (
    <Wrapper isDesktop={isDesktop}>
      <Col style={{ display: 'flex', alignItems: 'center' }}>
        <Link to={props.prevPageLink}>
          <Button
            style={{
              padding: '6px',
              border: `1px solid var(--primaryColor)`,
              height: 'fit-content',
            }}
            shape="circle"
          >
            {/* {props.prevPageText} */}
            <Icons size="30px" src={BackImage} />
          </Button>
        </Link>
      </Col>
      <Col
        style={{
          display: 'flex',
          alignItems: 'center',
          marginLeft: '20px',
        }}
        xs={{ span: 20 }}
        xl={{ span: 22 }}
      >
        <H1 fontWeight="700" style={{ textAlign: 'center' }}>
          {props.conceptName}
        </H1>
      </Col>
      <Col xs={{ span: 24 }} xl={{ span: 1 }}>
        <Button
          disabled={props.game ? props.evaluatedAnswer === undefined : false}
          shape="circle"
          type="primary"
          onClick={() => {
            setEditorState(
              EditorState.createWithContent(
                ContentState.createFromBlockArray(
                  convertFromHTML(
                    `<p>Description of doubt here</p><a href=${
                      window.location.href
                    }>Link to item</a>`,
                  ),
                ),
              ),
            );
            setNewThreadVisible(true);
          }}
          icon={<MessageOutlined />}
        />
      </Col>
    </Wrapper>
  );
}

ReadingMaterialNavigation.propTypes = {};

export default memo(ReadingMaterialNavigation);
