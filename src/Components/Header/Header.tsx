import { ChangeEvent } from "react";
import { Input, Tabs } from "antd";
import _ from "lodash";
import "./Header.css";

type PropsType = {
  OnChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  OnPageRouter: (page: "Search" | "Rated") => void;
  Page: "Search" | "Rated";
};

function Header({ OnChangeSearch, Page, OnPageRouter }: PropsType) {
  return (
    <div className="header__wrap">
      <div className="header__buttons__inner">
        <Tabs
          onChange={(e) => {
            if (e === "Search" || e === "Rated") {
              if (Page !== e) {
                OnPageRouter(e);
              }
            }
          }}
          items={[
            {
              key: "Search",
              label: "Search",
            },
            {
              key: "Rated",
              label: "Rated",
            },
          ]}
          defaultActiveKey={Page}
        />
      </div>
      <div className="header__input__inner">
        {Page === "Search" && (
          <Input
            onChange={_.debounce((e: ChangeEvent<HTMLInputElement>) => {
              OnChangeSearch(e);
            }, 2000)}
            placeholder="Type to search..."
            type="text"
          />
        )}
      </div>
    </div>
  );
}

export default Header;
