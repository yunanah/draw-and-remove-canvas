// List 컴포넌트
function List(props) {
  //props
  const { paths } = props;
  // console.log(Object.keys(paths))

  //render
  return (
    <div className="box">
      {Object.keys(paths).map((a, i) => {
        return <span key={i}>{a}</span>;
      })}
    </div>
  );
}

export default List;
