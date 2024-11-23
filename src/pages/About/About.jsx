import React from "react";
import PageTitle from "../../components/PageTitle/PageTitle";

const About = () => {
  return (
    <div>
      <div className="relative">
        <img
          src="./images/about.png"
          className="h-[600px] w-full cursor-pointer max-md:h-[300px]"
          alt="About img"
        />
        <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 bg-black bg-opacity-70 rounded-[30px] text-white text-center p-8 max-w-[800px] mx-auto py-4 px-20 max-md:max-w-[500px]">
          <h1 className="text-[32px] font-semibold leading-normal max-md:text-lg">
            "Một cuốn sách hay cho ta một điều tốt, một người bạn tốt cho ta một điều hay." <br />
            Gustavơ Lebon
          </h1>
        </div>
      </div>
      <div className="py-10 max-md:py-5">
        <PageTitle title="Giới thiệu về chúng tôi" className="text-center mb-2"></PageTitle>
        <div className="max-w-[800px] mx-auto">
          <p className="font-normal leading-normal mb-10 max-md:text-sm">
            Booktopia là một cửa hàng sách tuyệt vời, nơi bạn có thể khám phá thế giới tri thức
            phong phú. Với không gian ấm cúng và thiết kế tinh tế, Booktopia mang đến cho khách hàng
            trải nghiệm mua sắm sách dễ chịu và thú vị. Cửa hàng cung cấp đa dạng các thể loại sách
            từ văn học, khoa học, đến kỹ năng sống và sách thiếu nhi, đáp ứng nhu cầu của mọi lứa
            tuổi. Đội ngũ nhân viên thân thiện, nhiệt tình sẵn sàng tư vấn và hỗ trợ bạn tìm kiếm
            những cuốn sách hay nhất. Booktopia chính là điểm đến lý tưởng cho những ai yêu sách và
            đam mê tri thức.
          </p>
          <img
            src="./images/about2.png"
            className="h-[458px] w-full cursor-pointer max-md:h-[300px]"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default About;
