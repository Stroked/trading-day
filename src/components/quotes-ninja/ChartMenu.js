import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon } from 'semantic-ui-react';
import MenuButtons from "../coolook/MenuButtons";
const items = [
  { name: 'd1', label: '1D' },
  { name: 'm1', label: '1M' },
  { name: 'm3', label: '3M' },
  { name: 'm6', label: '6M' },
  { name: 'ytd', label: 'YTD' },
  { name: 'y1', label: '1Y' },
];

const ChartMenu = ({ active, up, perc, onClick }) => {
  return (<>
    <Menu widths={items.length} attached>
      {items.map(i => (
        <Menu.Item
          key={i.name}
          name={i.name}
          active={i.name === active}
          onClick={(e, { name }) => onClick(name)}
        >
          {i.name === active ? (
            <span>
              {`${i.label} ${perc}`}
              <Icon
                style={{ margin: 0 }}
                name={up ? 'caret up' : 'caret down'}
                color={up ? 'green' : 'red'}
              />
            </span>
          ) : (
            i.label
          )}
        </Menu.Item>
      ))}
    </Menu>
    </>
  );
};

ChartMenu.propTypes = {
  active: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ChartMenu;
