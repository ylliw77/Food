import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function CardMenu({ dish, component }) {
  const nav = useNavigate();
  async function handleClick() {
    nav(`/detail/${dish.id}`);
  }
  console.log(dish);
  return (
    <>
      <div className="col">
        <div className="card">
          <img src={dish?.imgUrl || ""} className="card-img-top" />
          <div className="card-body">
            <h5 className="card-title">{dish?.name || ""}</h5>
            <p className="card-text">Rp {dish?.price || ""}</p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <div onClick={handleClick}>
                <Button component={"Detail"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
