import { Component } from "react";
import { Pagination } from "antd";
import "./Pagination.css";

type PropsType = {
  totalCount: number;
  currentPage: number;
  OnChangePagination: (page: number) => void;
};

class PaginationComponent extends Component<PropsType> {
  render() {
    const { currentPage, totalCount, OnChangePagination } = this.props;
    return (
      <div className="pagination__inner">
        <Pagination
          onChange={OnChangePagination}
          defaultPageSize={20}
          current={currentPage}
          defaultCurrent={1}
          total={Math.ceil(totalCount / 20) * 20}
          showSizeChanger={false}
        />
      </div>
    );
  }
}

export default PaginationComponent;
