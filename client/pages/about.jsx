function About() {
  return (
    <>
      <div className="grid grid-cols-2 py-16  xl:px-36">
        <div>
          <img
            src="https://pvihm.info/images/who-are-we.JPG"
            className="w-[500px]  rounded-md h-[350px] object-cover"
            alt=""
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold">
            <span className="text-[#E3A008]">Who</span> Are We ?
          </h1>
          <p className="mt-5">
            PVIHM was established iin 2018 with a mission to deliver
            internationally recognized qualifications. PVIHM offers a range of
            qualifications in collaboration with LCCI Global Qualification
            approved by Scottish Qualification Authority (SQA) and benchedmarked
            at European Qualification Framework. LCCI GQ exist to make an impact
            in the education sytem in Nepal, ambition to deliever
            industry-relevant education and make skillful education accessible
            and beneficial to all those passionate. We are committed to the
            delievery of inclusive, cost-efficient, and internationally
            recognized academic programmes in the context of corn local
            requirements and values. Our goal is to reach more students with
            high-quality, life changing learning that meets true needs and
            enriches society.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-10 py-16  xl:px-36">
        <div>
          <h1 className="text-3xl font-bold">
            <span className="text-[#E3A008]">Our</span> Motives
          </h1>
          <p className="mt-5">
            Our aim is not just to provide learning but to ensure that all
            students can apply their knowledge and understanding, and problem
            solving abilities in actual work environments within broader
            contexts related to their field of study. The curricular and
            extra-curricular activities help students to develop a range of
            sector related technical, interpersonal, managerial and leadership
            skills.
          </p>
          <p>
          If you have big dreams, want to enhance your career in this
            highly competitive world, and are highly driven and want to reach
            beyond expectations, then PVIHM provides you with the environment
            which enables you to achieve your goals in life. You are cordially
            invited to explore PVIHM academics as well as soft skill programmes
            and its enriching learning environment and to discuss your need with
            its dedicated team.Our college has been a beacon of knowledge and
            skill development for many years, offering top-notch education in
            the form of the Advanced Diploma in Hotel Management (+2) and ADHM
            (Diploma) programs, among various other specialized hotel management
            certificates
          </p>
        </div>
        <div>
          <img
            src="https://pvihm.info/images/motive.jpg"
            className="w-[500px] mt-10 rounded-md h-[350px] object-cover"
            alt=""
          />
        </div>
      </div>
    </>
  );
}

export default About;
