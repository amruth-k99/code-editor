import React from "react";

const ProblemStatement = () => {
  return (
    <div style={{ maxHeight: "100vh" }} className="px-3 pt-5 overflow-y-scroll">
      <h2 className="text-lg font-bold">1. Two Sum</h2>
      <p className="mt-3">
        <span className="my-2">
          Given an array of integers nums and an integer target, return indices
          of the two numbers such that they add up to target.
        </span>
        <br className="py-2" />
        <span className="my-2">
          You may assume that each input would have exactly one solution, and
          you may not use the same element twice.
        </span>

        <span className="py-2">
          <br className="py-2" />
          You can return the answer in any order.
        </span>
      </p>
      <p className="mt-5">
        <span className="font-semibold">Example 1:</span> <br />
        <div className="bg-gray-100 rounded-sm p-2">
          Input: nums = [2,7,11,15], target = 9<br /> Output: [0,1] <br />
          Output: Because nums[0] + nums[1] == 9, we return [0, 1].
        </div>
      </p>

      <p className="mt-5">
        <span className="font-semibold">Example 2:</span> <br />
        <div className="bg-gray-100 rounded-sm p-2">
          Input: nums = [3,2,4], target = 6
          <br /> Output: [0,1] <br />
        </div>
      </p>

      <p className="mt-5">
        <span className="font-semibold">Example 3:</span> <br />
        <div className="bg-gray-100 rounded-sm p-2">
          Input: nums = [2,7,11,15], target = 9<br /> Output: [0,1] <br />
          Output: Because nums[0] + nums[1] == 9, we return [0, 1].
        </div>
      </p>

      <p className="mt-5">
        <span className="font-semibold">Constraints:</span> <br />
        <div className="bg-gray-100 rounded-sm p-2">
          <ul>
            <li>{"2 <= nums.length <= 104"}</li>
            <li>{"-109 <= nums[i] <= 109"}</li>
            <li>{"-109 <= target <= 109"}</li>
            <li>{"Only one valid answer exists."}</li>
          </ul>
        </div>
      </p>
    </div>
  );
};

export default ProblemStatement;
