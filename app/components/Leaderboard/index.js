/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
/**
 *
 * Leaderboard
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Row from 'antd/lib/row';
import Affix from 'antd/lib/affix';
import Col from 'antd/lib/col';
import H1 from 'components/atoms/H1';
import P from 'components/atoms/P';

import Icons from 'components/IconBox';
import RankIcon from 'images/rank.png';
import ScoreIcon from 'images/score.png';
import StreakIcon from 'images/fire.png';
import BgImage from 'images/LeaderBoardBg.jpg';
import { StyledDiv } from '../DashboardComponent';
import useMediaQuery from '../../utils/useMediaQuery';

const Wrapper = styled(Row)`
  background-image: url(${BgImage});
  background-size: cover;
  .theme-img {
    width: 20em;
    border-radius: 10px;
  }

  .description {
    display: flex;
    justify-content: space-between;
  }
  .search {
    border-radius: 5px;
    border: none;
    background-color: transparent;
    border-bottom: var(--primaryColor) 3px solid;
    padding: 0.5em;
    font-size: 1em;
    // color: var(--primaryColor);
    width: 100%;
  }
  .search:focus {
    outline: none;
  }
  table {
    margin-top: 2em;
    width: 95% !important;
    color: var(--primaryColor);
    margin-right: auto;
    margin-left: auto;
  }
  table thead {
    font-weight: 700 !important;
    font-size: 20px;
  }
  table img {
    width: 2em;
    height: 2em;
    border-radius: 100%;
  }
  table td {
    // max-width: 2em;
    padding: 0.5em;
    text-align: center;
  }

  tbody tr {
    box-shadow: 0 2px rgba(100, 100, 100, 0.5);
    border-radius: 10px;
    font-size: 18px;
    font-weight: 500;
    font-family: Arial !important;
    height: 55px !important;
  }
  tbody tr:hover {
    // transform: scale(1.005);
    // transition: 0.2s ease-in-out;
    // font-weight: 700;
  }
  tbody tr td:nth-child(2) p {
    display: inline-block;
    // transform: translateY(-0.5em);
    padding-left: 0.5em;
    text-align: left;
  }
  table td:nth-child(2) {
    max-width: 5em;
  }
  #winner {
    color: gold;
    font-weight: 800;
  }
  #runner-up {
    color: silver;
    font-weight: 800;
  }
  #second-runner-up {
    color: #cd7f32;
    font-weight: 800;
  }
  @media (max-width: 860px) {
    .leaderboard {
      padding: 0;
    }
    .theme-img {
      margin-right: auto;
      margin-left: auto;
      display: block;
    }
    .description {
      display: block;
      transform: translateY(0);
    }
    table {
      max-width: 100vw;
      overflow-x: scroll;
    }
  }
`;

function Leaderboard(props) {
  // console.log(props.leaderboard);
  const [leaderboard, setLeaderboard] = useState(props.leaderboard);
  const [input, setInput] = useState('');

  const isDesktop = useMediaQuery('(min-width: 960px)');

  const IconStats = (image, text, value) => (
    <Row style={{ minHeight: '40px', margin: '10px 0' }}>
      <Col style={{ display: 'flex', justifyContent: 'center' }}>
        <Icons size={isDesktop ? '40px' : '30px'} src={image} />
      </Col>
      <Col
        style={{ display: 'flex', alignItems: 'flex-end', marginLeft: '12px' }}
      >
        <P style={{ marginLeft: '12px', fontWeight: 700, fontSize: '20px' }}>
          {text}:
        </P>
        <P style={{ marginLeft: '12px', fontWeight: 700, fontSize: '20px' }}>
          {value}
        </P>
      </Col>
    </Row>
  );

  useEffect(() => {
    if (input.length && props.leaderboard) {
      let lBoard = [...props.leaderboard];

      lBoard = lBoard.filter(item => {
        if (item.rank.toString().includes(input.toLowerCase())) return true;
        if (
          item.name &&
          item.name
            .toString()
            .toLowerCase()
            .includes(input.toLowerCase())
        )
          return true;

        if (
          item.organisation &&
          item.organisation
            .toString()
            .toLowerCase()
            .includes(input.toLowerCase())
        )
          return true;

        if (
          item.overall_proficiency
            .toString()
            .toLowerCase()
            .includes(input.toLowerCase())
        )
          return true;

        if (
          item.class &&
          item.class
            .toString()
            .toLowerCase()
            .includes(input.toLowerCase())
        )
          return true;
      });

      setLeaderboard(lBoard);
    } else {
      setLeaderboard(props.leaderboard);
    }
  }, [input]);

  console.log(input);

  const getMyStats = () => (
    <StyledDiv>
      <H1 fontWeight="700">{props.stats.name}</H1>
      <P style={{ margin: '4px 0 16px' }} fontWeight="700">
        {props.stats.organisation}
      </P>
      {IconStats(RankIcon, 'Rank', props.stats.rank)}
      {IconStats(
        ScoreIcon,
        'Overall Proficiency',
        props.stats.overall_proficiency + '%',
      )}
      {IconStats(StreakIcon, 'Highest Streak', props.stats.highest_streak)}
    </StyledDiv>
  );

  return (
    <Wrapper>
      <Col
        xl={{ span: 8 }}
        xs={{ span: 24 }}
        style={{
          height: isDesktop ? 'calc(100vh - 80px)' : '100%',
          padding: '40px',
        }}
      >
        {isDesktop ? (
          <Affix offsetTop={100}>{getMyStats()}</Affix>
        ) : (
          getMyStats()
        )}
      </Col>
      <Col
        style={{
          minHeight:
            isDesktop || !props.stats.role ? 'calc(100vh - 80px)' : '100%',
          padding: '40px',
        }}
        xl={{ span: !props.stats.role ? 24 : 16 }}
        xs={{ span: 24 }}
      >
        <div className="leaderboard">
          <Row style={{ marginTop: '20px' }}>
            <Col xl={{ span: 18 }}>
              <H1 fontWeight="700">LEADERBOARD</H1>
            </Col>
            <Col xl={{ span: 6 }}>
              <input
                id="search"
                className="search"
                placeholder="Search"
                onChange={e => setInput(e.target.value)}
              />
            </Col>
          </Row>

          <P>{new Date().toDateString()}</P>
          <div style={{ overflow: 'auto' }}>
            <table style={{ paddingBottom: '40px' }}>
              <thead>
                <tr style={{ marginBottom: '40px' }}>
                  <td style={{ minWidth: isDesktop ? '10%' : '40px' }} />
                  <td style={{ minWidth: isDesktop ? '20%' : '200px' }}>
                    NAME
                  </td>
                  <td style={{ minWidth: isDesktop ? '40%' : '400px' }}>
                    SCHOOL
                  </td>
                  <td style={{ minWidth: !isDesktop && '100px' }}>CLASS</td>
                  <td style={{ minWidth: !isDesktop && '100px' }}>
                    PROFICIENCY
                  </td>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((item, index) => (
                  <tr>
                    <td
                      style={{ width: '10%' }}
                      id={
                        item.rank === 1
                          ? 'winner'
                          : item.rank === 2
                          ? 'runner-up'
                          : item.rank === 3
                          ? 'second-runner-up'
                          : 'auto'
                      }
                    >
                      {item.rank}
                    </td>
                    <td style={{ width: '20%' }}>
                      <P>{item.name}</P>
                    </td>
                    <td style={{ width: '40%', textOverflow: 'ellipsis' }}>
                      {item.organisation || '_'}
                    </td>
                    <td>{item.class || '_'}</td>
                    <td>{item.overall_proficiency}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Col>
    </Wrapper>
  );
}

Leaderboard.propTypes = {};

export default memo(Leaderboard);
