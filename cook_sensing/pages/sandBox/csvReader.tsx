// scvを読み込む方法

import React, { CSSProperties } from "react";

import { useCSVReader } from "react-papaparse";

const styles = {
  csvReader: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 10,
  } as CSSProperties,
  browseFile: {
    width: "20%",
  } as CSSProperties,
  acceptedFile: {
    border: "1px solid #ccc",
    height: 45,
    lineHeight: 2.5,
    paddingLeft: 10,
    width: "80%",
  } as CSSProperties,
  remove: {
    borderRadius: 0,
    padding: "0 20px",
  } as CSSProperties,
  progressBarBackgroundColor: {
    backgroundColor: "red",
  } as CSSProperties,
};

export default function CSVReader() {
  const { CSVReader } = useCSVReader();

  return (
    <CSVReader
      onUploadAccepted={(results: any) => {
        // 13m/s^2以上，前回の判定から0.5秒後かつ13m/s^2を一度下回らないと新たに判定は行わない
        console.log("---------------------------");
        var flg = true;
        var times = 0;
        var timeflg = 0;
        for (var i = 0; results.data.length > i + 1; i++) {
          var norm =
            (Number(results.data[i][1]) ** 2 +
              Number(results.data[i][2]) ** 2 +
              Number(results.data[i][3]) ** 2) **
            0.5;

          if (
            i != 0 &&
            results.data[i][0] >= 1657259720767 &&
            results.data[i][0] <= 1657259795936 &&
            results.data[i][0] - timeflg > 500
          ) {
            if (norm > 13 && flg) {
              times = times + 1;
              console.log(
                times + "回目 time=" + results.data[i][0] + ",norm=" + norm
              );

              flg = false;
              timeflg = results.data[i][0];
            } else if (norm <= 13 && !flg) {
              flg = true;
            }
          }
        }

        console.log("---------------------------");
      }}
    >
      {({
        getRootProps,
        acceptedFile,
        ProgressBar,
        getRemoveFileProps,
      }: any) => (
        <>
          <div style={styles.csvReader}>
            <button type="button" {...getRootProps()} style={styles.browseFile}>
              Browse file
            </button>
            <div style={styles.acceptedFile}>
              {acceptedFile && acceptedFile.name}
            </div>
            <button {...getRemoveFileProps()} style={styles.remove}>
              Remove
            </button>
          </div>
          <ProgressBar style={styles.progressBarBackgroundColor} />
        </>
      )}
    </CSVReader>
  );
}
