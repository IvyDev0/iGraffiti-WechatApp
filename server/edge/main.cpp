#include <stdio.h>
#include "opencv2/imgproc/imgproc.hpp"
#include "opencv2/highgui/highgui.hpp"
using namespace cv;

const char* TITLE = "Sobel Demo - Simple Edge Detector";
Mat g_grad, g_grad_threshold;
int g_threshold = 35;

// 拖动控件控制阈值
// void on_trackbar(int pos, void* userdata)
// {
//     threshold(g_grad, g_grad_threshold, g_threshold, 255, CV_THRESH_TOZERO);
//     bitwise_not(g_grad_threshold, g_grad_threshold);
//     imshow(TITLE, g_grad_threshold);
// }

int main(int argc, char* argv[]) {
    // Load an image
    Mat src = imread(argv[1]);

    if (src.data == NULL) {
        printf("Failed to load the image!\n%s\n", argv[1]);
        return 1;
    }


    // Blur (RGB)
    //GaussianBlur(src, src, Size(3, 3), 0);

    // Convert it to gray
    Mat src_gray;
    cvtColor(src, src_gray, CV_RGB2GRAY);

    // Blur (gray)
    GaussianBlur(src_gray, src_gray, Size(3, 3), 0);

    // Gradient X
    Mat grad_x, abs_grad_x;
    Sobel(src_gray, grad_x, CV_16S, 1, 0, 3); // Also try ksize = 1
    convertScaleAbs(grad_x, abs_grad_x);

    // Gradient Y
    Mat grad_y, abs_grad_y;
    Sobel(src_gray, grad_y, CV_16S, 0, 1, 3); // Also try ksize = 1
    convertScaleAbs(grad_y, abs_grad_y);

    // Total Gradient (approximate)
    addWeighted(abs_grad_x, 0.5, abs_grad_y, 0.5, 0, g_grad);

    // Late process
    threshold(g_grad, g_grad_threshold, g_threshold, 255, CV_THRESH_TOZERO);
    bitwise_not(g_grad_threshold, g_grad_threshold);

    // Show the image
    // namedWindow(TITLE, CV_WINDOW_KEEPRATIO);
    // createTrackbar("threshold", TITLE, &g_threshold, 255, on_trackbar);
    // imshow(TITLE, g_grad_threshold);
    // waitKey(0);
    // 直接输出处理后的图像
    imwrite("./after.jpg", g_grad_threshold);

    return 0;


}