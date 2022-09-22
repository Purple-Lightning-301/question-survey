import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { resultAtom } from "../../user.recoil";
import diamond from "../../resources/diamond.png";
import spade from "../../resources/spade.png";
import heart from "../../resources/heart.png";

function Result(props) {
  const rersultAtom = useRecoilValue(resultAtom);
  const [fullResult, setFullResult] = useState(null);

  useEffect(() => {
    if (rersultAtom?.length > 0) {
      let spade = rersultAtom.filter((r) => {
        return r.key % 4 === 1;
      });
      let club = rersultAtom.filter((r) => {
        return r.key % 4 === 2;
      });
      let heart = rersultAtom.filter((r) => {
        return r.key % 4 === 3;
      });
      let diamond = rersultAtom.filter((r) => {
        return r.key % 4 === 0;
      });

      let totalSpade = spade?.reduce((prev, current) => {
        return prev + +current.value;
      }, 0);
      let totalClub = club?.reduce((prev, current) => {
        return prev + +current.value;
      }, 0);
      let totalHeart = heart?.reduce((prev, current) => {
        return prev + +current.value;
      }, 0);
      let totalDiamond = diamond?.reduce((prev, current) => {
        return prev + +current.value;
      }, 0);

      let personalTypes = [
        { name: "spade", point: totalSpade },
        { name: "club", point: totalClub },
        { name: "heart", point: totalHeart },
        { name: "diamond", point: totalDiamond },
      ];
      let maxPoint = Math.max(totalSpade, totalClub, totalHeart, totalDiamond);
      let minPoint = Math.min(totalSpade, totalClub, totalHeart, totalDiamond);
      let maxPersonalType = personalTypes?.find(
        (type) => type.point === maxPoint
      )?.name;
      let minPersonalType = personalTypes?.find(
        (type) => type.point === minPoint
      )?.name;

      setFullResult({
        maxPersonalType,
        minPersonalType,
        personalTypes,
      });
    }
  }, [rersultAtom]);

  return (
    <div className="vh-100 d-flex align-items-center justify-content-around">
      <div className="d-flex align-items-center justify-content-center">
        {fullResult?.minPersonalType === "diamond" && (
          <div className="card m-auto" style={{ width: "18rem" }}>
            <img src={diamond} className="card-img-top" alt="..." />
            <div className="card-body">
              <p className="card-text">Lá bài đầu tiên của bạn là chất Rô</p>
            </div>
          </div>
        )}
        {fullResult?.minPersonalType === "spade" && (
          <div className="card m-auto" style={{ width: "18rem" }}>
            <img src={spade} className="card-img-top" alt="..." />
            <div className="card-body">
              <p className="card-text">Lá bài đầu tiên của bạn là chất Bích</p>
            </div>
          </div>
        )}
        {fullResult?.minPersonalType === "heart" && (
          <div className="card m-auto" style={{ width: "18rem" }}>
            <img src={heart} className="card-img-top" alt="..." />
            <div className="card-body">
              <p className="card-text">Lá bài đầu tiên của bạn là chất Cơ</p>
            </div>
          </div>
        )}
        {fullResult?.minPersonalType === "club" && (
          <div className="card m-auto" style={{ width: "18rem" }}>
            <img src={heart} className="card-img-top" alt="..." />
            <div className="card-body">
              <p className="card-text">Lá bài đầu tiên của bạn là chất Tép</p>
            </div>
          </div>
        )}
      </div>
      <div className="d-flex align-items-center justify-content-center">
        {fullResult?.maxPersonalType === "diamond" && (
          <div className="card m-auto" style={{ width: "18rem" }}>
            <img src={diamond} className="card-img-top" alt="..." />
            <div className="card-body">
              <p className="card-text">Lá bài thứ hai của bạn là chất Rô</p>
            </div>
          </div>
        )}
        {fullResult?.maxPersonalType === "spade" && (
          <div className="card m-auto" style={{ width: "18rem" }}>
            <img src={spade} className="card-img-top" alt="..." />
            <div className="card-body">
              <p className="card-text">Lá bài đầu tiên của bạn là chất Bích</p>
            </div>
          </div>
        )}
        {fullResult?.maxPersonalType === "heart" && (
          <div className="card m-auto" style={{ width: "18rem" }}>
            <img src={heart} className="card-img-top" alt="..." />
            <div className="card-body">
              <p className="card-text">Lá bài đầu tiên của bạn là chất Cơ</p>
            </div>
          </div>
        )}
        {fullResult?.maxPersonalType === "club" && (
          <div className="card m-auto" style={{ width: "18rem" }}>
            <img src={heart} className="card-img-top" alt="..." />
            <div className="card-body">
              <p className="card-text">Lá bài đầu tiên của bạn là chất Tép</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Result;
