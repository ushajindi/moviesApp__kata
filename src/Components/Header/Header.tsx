import { ChangeEvent, Component } from "react";
import "./Header.css";
import { Input, Tabs } from "antd";
import _ from "lodash";

type PropsType = {
  OnChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  movieSearch: string;
};

class Header extends Component<PropsType> {
  render() {
    const { OnChangeSearch } = this.props;
    return (
      <div className="header__wrap">
        <div className="header__buttons__inner">
          <Tabs
            items={[
              {
                key: "1",
                label: "Search",
              },
              {
                key: "2",
                label: "Rated",
              },
            ]}
            defaultActiveKey="1"
          />
        </div>
        <div className="header__input__inner">
          <Input
            onChange={_.debounce((e: ChangeEvent<HTMLInputElement>) => {
              OnChangeSearch(e);
            }, 2000)}
            placeholder="Type to search..."
            type="text"
          />
        </div>
      </div>
    );
  }
}

export default Header;
